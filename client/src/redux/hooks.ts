import type {Action, ThunkDispatch} from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState } from './store';

type DispatchFunk = () => ThunkDispatch<RootState, void, Action>

export const useAppDispatch: DispatchFunk = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
