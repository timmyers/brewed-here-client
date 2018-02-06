import * as React from 'react';
import { Provider, useStaticRendering } from 'mobx-react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { BreweryStore } from 'Stores/BreweryStore';

exports.replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  useStaticRendering(true);

  const sheet = new ServerStyleSheet()

  const app = (
    <StyleSheetManager sheet={sheet.instance}>
      <Provider BreweryStore={BreweryStore}>
        {bodyComponent}
      </Provider>
    </StyleSheetManager>
  )

  const body = renderToString(app)

  replaceBodyHTMLString(body)
  setHeadComponents([sheet.getStyleElement()])
};