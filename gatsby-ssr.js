import * as React from 'react';
import { Provider, useStaticRendering } from 'mobx-react';
import { renderToString } from 'react-dom/server';
import { JssProvider, SheetsRegistry } from 'react-jss';
import { create } from 'jss';
import preset from 'jss-preset-default';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { BreweryStore } from 'Stores/BreweryStore';

exports.replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  useStaticRendering(true);

  const sheets = new SheetsRegistry();
  const jss = create(preset());
  jss.options.createGenerateClassName = createGenerateClassName;

  const sheet = new ServerStyleSheet()

  const app = (
    <JssProvider registry={sheets} jss={jss}>
      <StyleSheetManager sheet={sheet.instance}>
        <Provider BreweryStore={BreweryStore}>
          {bodyComponent}
        </Provider>
      </StyleSheetManager>
    </JssProvider>
  )

  const body = renderToString(app)

  replaceBodyHTMLString(body)
  setHeadComponents([
    sheet.getStyleElement(),
    <style
      type="text/css"
      id="server-side-jss"
      key="server-side-jss"
      dangerouslySetInnerHTML={{ __html: sheets.toString() }}
    />,
  ])
};