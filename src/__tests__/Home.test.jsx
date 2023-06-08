import React from "react";
import Home from "../Components/Home/index";
import renderer from 'react-test-renderer'

describe('Testing Home screen component...', () => {

  test('Home screen should be visible', () => {
    const tree = renderer.create(<Home />).toJSON();
    console.log(tree)
  })

})