import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {FullInput} from "../components/FullInput";
import {action} from "@storybook/addon-actions";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLIST/FullInput',
    component: FullInput,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        callBack: {
            description: 'button clicked inside form'
        },
    },
} as ComponentMeta<typeof FullInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FullInput> = (args) => <FullInput {...args} />;

export const FullInputStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FullInputStories.args = {
    callBack: action('button clicked inside form')
};

