import React from "react";
import {
  AlignItemsEditor,
  Flex,
  FlexConfigurableProps,
  FlexDirectionEditor,
} from "./components/Flex";
import { NumberPropEditor } from "./components/NumberPropEditor";
import { Text } from "./components/Text";
import { Button } from "./components/ui/button";
import { ConfigurablePropsMap, PreviewComponentMap } from "./typings";

// TODO: Provider
export const previewComponentsMap: PreviewComponentMap = {
  fragment: {
    title: "Fragment",
    component: React.Fragment,
    type: "layout",
  },
  flex: {
    title: "Flex",
    component: Flex,
    type: "layout",
    props: {
      flexDirection: {
        required: false,
        default: "row",
        editor: FlexDirectionEditor,
      },
      gap: {
        required: false,
        default: 8,
        editor: NumberPropEditor,
      },
      alignItems: {
        required: false,
        default: "stretch",
        editor: AlignItemsEditor,
      },
    } satisfies ConfigurablePropsMap<FlexConfigurableProps>,
  },
  text: {
    title: "Text",
    type: "component",
    component: Text,
  },
  button: {
    title: "Button",
    type: "component",
    component: Button,
  },
};
