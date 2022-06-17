import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from "../Task";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";
import {TaskType} from "../TodoListWithTasks";


export default {
    title: 'TODOLIST/Task',
    component: Task,
    args: {
        todolistId: 'ffffff'
    },
    decorators: [ReduxStoreProviderDecorator]

} as ComponentMeta<typeof Task>;

const TaskWithDispatch = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId2'][0])

    return <Task task={task} todolistId={'todolistId2'}/>
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TaskWithDispatch> = (args) => <TaskWithDispatch  />

export const TaskWithDispatchStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskWithDispatchStories.args = {};


