import React, {
  Dispatch,
  FC,
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { ResizeFrame } from "../ResizeFrame";
import { Client } from "../Client";
import { TitleBar } from "../TitleBar";
import { Root } from "./Win.styled";
import {
  ActionType,
  BaseType,
  useWindow,
  WindowParams,
  WindowState,
} from "./../../libs/WindowManager";

/**
 *
 *
 * @interface Props
 */
interface Props {
  title?: ReactNode;
  titleEnable?: boolean;
  titleSize?: number;
  titleButtons?: { [key in "min" | "max" | "close"]?: boolean };
  active?: boolean;
  overlapped?: boolean;
  baseX?: BaseType;
  baseY?: BaseType;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  child?: boolean;
  state?: WindowState;
  frameSize?: number;
  resize?: boolean;
  resizeBold?: number;
  clientStyle?: React.CSSProperties;
  clientClass?: string;
  clientMovable?: boolean;
  dispatch?: MutableRefObject<Dispatch<ActionType> | null>;
  onUpdate?: (params: WindowParams) => void;
}

/**
 * Windowコンポーネント
 *
 * @param {Props}
 * @return {*}
 */
export const Win: FC<Props> = ({
  title = "",
  titleSize = 32,
  titleEnable = true,
  titleButtons,
  active = false,
  overlapped = true,
  x = 0,
  y = 0,
  baseY = "start",
  baseX = "start",
  width = 640,
  height = 480,
  state = "normal",
  frameSize = 1,
  resize = true,
  resizeBold = 8,
  clientStyle,
  clientClass,
  clientMovable = false,
  children,
  dispatch: refDispatch,
  onUpdate,
}) => {
  const refWindow = useRef<HTMLDivElement>(null);
  const { params, handleWindow, dispatch } = useWindow(() => ({
    ref: refWindow,
    active,
    overlapped,
    baseX,
    baseY,
    x,
    y,
    titleSize: titleSize,
    width,
    height,
    state,
  }));
  useEffect(() => {
    if (refDispatch) refDispatch.current = dispatch;
  }, [refDispatch]);
  useEffect(() => {
    onUpdate?.(params);
  }, [params]);
  return (
    <Root
      ref={refWindow}
      onMouseDown={handleWindow}
      titleSize={titleSize}
      style={{
        left: `${params.x}px`,
        top: `${params.y}px`,
        width: `${params.width}px`,
        height: `${params.height}px`,
        position: overlapped ? "fixed" : "absolute",
      }}
    >
      {titleEnable && (
        <TitleBar
          titleSize={titleSize}
          frameSize={frameSize}
          buttons={titleButtons}
          active={params.active}
          state={params.state}
          onMouse={handleWindow}
          dispatch={dispatch}
        >
          {title}
        </TitleBar>
      )}
      <Client
        className={clientClass}
        style={clientStyle}
        frameSize={frameSize}
        onMouse={handleWindow}
        state={params.state}
        movable={clientMovable}
      >
        {children}
      </Client>
      {resize && (
        <ResizeFrame
          frameSize={frameSize}
          resizeBold={resizeBold}
          onMouse={handleWindow}
        />
      )}
    </Root>
  );
};
