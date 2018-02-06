import * as React from 'react';
import { Provider, useStaticRendering } from "mobx-react";
import { renderToString } from "react-dom/server";
import { BreweryStore } from 'Stores/BreweryStore';

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  useStaticRendering(true);

  const ProviderBody = () => (
    <Provider BreweryStore={BreweryStore}>
      {bodyComponent}
    </Provider>
  );

  replaceBodyHTMLString(renderToString(<ProviderBody />));
};