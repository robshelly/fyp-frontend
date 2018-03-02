import React, {Component} from 'react';
import SwaggerUi, {presets} from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

// https://github.com/swagger-api/swagger-ui/issues/3000
class SwaggerTest extends Component {
  componentDidMount() {
    SwaggerUi({
      dom_id: '#swaggerContainer',
      url: 'swagger.json',
      presets: [presets.apis],
    });
  }

  render() {
    return (
      <div id="swaggerContainer" />
    );
  }
}

export default SwaggerTest;


