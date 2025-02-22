import { useCallback, useEffect, useState } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { routes, params } from '../../config';

const errorMessages = {
  node: 'Please check the value of "selected_id" in the URL',
  modularPipeline: 'Please check the value of "focused_id" in the URL',
  pipeline: 'Please check the value of "pipeline_id" in the URL',
};

/**
 * To trigger different actions based on the current location in the Flowchart.
 * This hook is only called when the page is reloaded or when the URL search changes.
 */
export const useRedirectLocationInFlowchart = (
  modularPipelinesTree,
  nodes,
  onLoadNodeData,
  onToggleFocusMode,
  onToggleModularPipelineActive,
  onToggleModularPipelineExpanded,
  onUpdateActivePipeline,
  pipelines,
  reload
) => {
  const { pathname, search } = useLocation();

  const [errorMessage, setErrorMessage] = useState({});
  const [invalidUrl, setInvalidUrl] = useState(false);

  const activePipelineId = search.substring(
    search.indexOf(params.pipeline) + params.pipeline.length,
    search.indexOf('&')
  );

  const decodedPipelineId = decodeURI(activePipelineId);

  const matchedFlowchartMainPage = matchPath(pathname + search, {
    exact: true,
    path: [routes.flowchart.main],
  });

  const matchedSelectedNode = matchPath(pathname + search, {
    exact: true,
    path: [routes.flowchart.selectedNode],
  });

  const matchedFocusedNode = matchPath(pathname + search, {
    exact: true,
    path: [routes.flowchart.focusedNode],
  });

  const updatePipeline = useCallback(
    (pipelines, decodedPipelineId) => {
      const foundPipeline = pipelines.find((id) => id === decodedPipelineId);

      if (foundPipeline) {
        onUpdateActivePipeline(decodedPipelineId);
      } else {
        setErrorMessage(errorMessages.pipeline);
        setInvalidUrl(true);
      }
    },
    [onUpdateActivePipeline]
  );

  useEffect(() => {
    setErrorMessage({});
    setInvalidUrl(false);

    if (matchedFlowchartMainPage) {
      onLoadNodeData(null);
      onToggleFocusMode(null);
    }

    if (matchedSelectedNode && Object.keys(nodes).length > 0) {
      // Switching the view forces the page to reload again
      // hence this action needs to happen first
      updatePipeline(pipelines, decodedPipelineId);

      // Reset the focus mode to null when when using the navigation buttons
      onToggleFocusMode(null);

      // This timeout is to ensure it has enough time to
      // change to a different modular pipeline view first
      const switchingModularPipelineTimeout = setTimeout(() => {
        const nodeId = search.split(params.selected)[1];
        const foundNode = Object.keys(nodes).find((node) => node === nodeId);
        if (foundNode) {
          const modularPipeline = nodes[nodeId];
          const hasModularPipeline = modularPipeline?.length > 0;

          if (hasModularPipeline) {
            onToggleModularPipelineExpanded(modularPipeline);
          }

          // then upload the node data
          onLoadNodeData(nodeId);
        } else {
          setErrorMessage(errorMessages.node);
          setInvalidUrl(true);
        }
      }, 500);

      return () => clearTimeout(switchingModularPipelineTimeout);
    }

    if (matchedFocusedNode && Object.keys(modularPipelinesTree).length > 0) {
      updatePipeline(pipelines, decodedPipelineId);

      // Reset the node data to null when when using the navigation buttons
      onLoadNodeData(null);

      const switchingModularPipelineTimeout = setTimeout(() => {
        const modularPipelineId = search.split(params.focused)[1];

        const foundModularPipeline = modularPipelinesTree[modularPipelineId];

        if (foundModularPipeline) {
          onToggleModularPipelineActive(modularPipelineId, true);
          onToggleFocusMode(foundModularPipeline.data);
        } else {
          setErrorMessage(errorMessages.modularPipeline);
          setInvalidUrl(true);
        }
      }, 500);

      return () => clearTimeout(switchingModularPipelineTimeout);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, search]);

  return { errorMessage, invalidUrl };
};
