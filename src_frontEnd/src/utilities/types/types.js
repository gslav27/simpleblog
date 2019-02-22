import { shape, arrayOf, string } from 'prop-types';

import {
  postInterface,
  currentPostInterface,
  currentPostCommentInterface,
} from './interfaces';
import { postDefaultValues } from './defaultData';
import PropsDataApi from './_PropsDataApi';


export const CurrentPostPropsData = new PropsDataApi(currentPostInterface, postDefaultValues);
export const CurrentPostCommentPropsData = new PropsDataApi(currentPostCommentInterface, postDefaultValues);
export const PostPropsData = new PropsDataApi(postInterface, postDefaultValues);

export const postPropType = shape(postInterface);
export const currentPostPropType = shape(currentPostInterface);
export const currentPostCommentPropType = shape(currentPostCommentInterface);

export const latestPostsPropType = arrayOf(postPropType);
export const mainCommentsPropType = arrayOf(string);
