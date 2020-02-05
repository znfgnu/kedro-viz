import animals from '../utils/data/animals.mock';
import {
  RESET_DATA,
  TOGGLE_NODE_CLICKED,
  TOGGLE_NODES_DISABLED,
  TOGGLE_NODE_HOVERED,
  TOGGLE_TAG_ACTIVE,
  TOGGLE_TAG_FILTER,
  TOGGLE_THEME,
  TOGGLE_TYPE_DISABLED,
  TOGGLE_TEXT_LABELS,
  UPDATE_CHART_SIZE,
  UPDATE_FONT_LOADED,
  resetData,
  toggleNodeClicked,
  toggleNodesDisabled,
  toggleNodeHovered,
  toggleTextLabels,
  toggleTagActive,
  toggleTheme,
  toggleTypeDisabled,
  toggleTagFilter,
  updateChartSize,
  updateFontLoaded
} from '../actions';

describe('actions', () => {
  it('should create an action to reset pipeline data', () => {
    const expectedAction = {
      type: RESET_DATA,
      data: animals
    };
    expect(resetData(animals)).toEqual(expectedAction);
  });

  it('should create an action to toggle whether a node has been clicked', () => {
    const nodeClicked = '12367890';
    const expectedAction = {
      type: TOGGLE_NODE_CLICKED,
      nodeClicked
    };
    expect(toggleNodeClicked(nodeClicked)).toEqual(expectedAction);
  });

  it('should create an action to toggle whether a node has been clicked', () => {
    const nodeHovered = '12367890';
    const expectedAction = {
      type: TOGGLE_NODE_HOVERED,
      nodeHovered
    };
    expect(toggleNodeHovered(nodeHovered)).toEqual(expectedAction);
  });

  it('should create an action to toggle whether somes nodes are disabled', () => {
    const nodeIDs = ['12367890', '0987654321', 'qwertyuiop'];
    const isDisabled = false;
    const expectedAction = {
      type: TOGGLE_NODES_DISABLED,
      nodeIDs,
      isDisabled
    };
    expect(toggleNodesDisabled(nodeIDs, isDisabled)).toEqual(expectedAction);
  });

  it('should create an action to toggle whether to show text labels on/off', () => {
    const textLabels = false;
    const expectedAction = {
      type: TOGGLE_TEXT_LABELS,
      textLabels
    };
    expect(toggleTextLabels(textLabels)).toEqual(expectedAction);
  });

  it("should create an action to toggle a tag's active state on/off", () => {
    const tagID = '1234567890';
    const active = false;
    const expectedAction = {
      type: TOGGLE_TAG_ACTIVE,
      tagID,
      active
    };
    expect(toggleTagActive(tagID, active)).toEqual(expectedAction);
  });

  it('should create an action to toggle a tag on/off', () => {
    const tagID = '1234567890';
    const enabled = false;
    const expectedAction = {
      type: TOGGLE_TAG_FILTER,
      tagID,
      enabled
    };
    expect(toggleTagFilter(tagID, enabled)).toEqual(expectedAction);
  });

  it('should create an action to toggle the theme', () => {
    const theme = 'light';
    const expectedAction = {
      type: TOGGLE_THEME,
      theme
    };
    expect(toggleTheme(theme)).toEqual(expectedAction);
  });

  it('should create an action to toggle whether a type is disabled', () => {
    const typeID = '123';
    const disabled = true;
    const expectedAction = {
      type: TOGGLE_TYPE_DISABLED,
      typeID,
      disabled
    };
    expect(toggleTypeDisabled(typeID, disabled)).toEqual(expectedAction);
  });

  it('should create an action to update the chart size', () => {
    const chartSize = {
      x: 10,
      y: 20,
      outerWidth: 30,
      outerHeight: 40,
      width: 50,
      height: 60,
      navOffset: 70
    };
    const expectedAction = {
      type: UPDATE_CHART_SIZE,
      chartSize
    };
    expect(updateChartSize(chartSize)).toEqual(expectedAction);
  });

  it('should create an action to update the state when the webfont has loaded', () => {
    const fontLoaded = true;
    const expectedAction = {
      type: UPDATE_FONT_LOADED,
      fontLoaded
    };
    expect(updateFontLoaded(fontLoaded)).toEqual(expectedAction);
  });
});
