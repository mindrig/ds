import { FlatPromise } from "./utils";

/**
 * The modal props intersection, adds system functionality such as close and id.
 * It's passed along with the modal props to the component when rendering.
 */
export type ModalPropsIntersection<Props, Result = unknown> = Props &
  ModalProps<Result>;

/**
 * The modal props, added to custom props when rendering the modal. It's also
 * used as the modal context value.
 */
export interface ModalProps<Result> {
  /** Closes the current modal. */
  close: (result?: Result) => void;
  /** The modal id */
  id: string;
}

/**
 * The modal options, allows to configure the behaviour. Passed
 * to {@link createModal} and used internally.
 */
export interface ModalOptions<
  ManualRender extends boolean,
  ForwardRef extends boolean,
> {
  /** Should click on overlay close the modal? */
  overlayClose?: boolean;
  /** Should the modal render be delegated to the component? It allows to
   * render the modal in the context. */
  manualRender?: ManualRender;
  /** Should ref be forwarded? */
  forwardRef?: ForwardRef;
}

/**
 * The modal API, returned by {@link createModal}. It's a function that
 * allows to assign options and it also has {@link use} function that returns
 * the end-user hook API.
 */
export interface ModalAPI<
  Props,
  Result,
  RefTo,
  ManualRender extends boolean,
  ForwardRef extends boolean,
> {
  /** Options call that assigns options object and types.  */
  <AssignedManualRender extends boolean, AssignedForwardRef extends boolean>(
    options: ModalOptions<AssignedManualRender, AssignedForwardRef>,
  ): ModalAPI<
    Props,
    Result,
    RefTo,
    // If AssignedManualRender is not true or false, use previous value
    boolean extends AssignedManualRender ? ManualRender : AssignedManualRender,
    // If AssignedForwardRef is not true or false, use previous value
    boolean extends AssignedForwardRef ? ForwardRef : AssignedForwardRef
  >;

  use(): ModalHookAPI<
    false extends ForwardRef
      ? Props
      : Props & { ref: React.ForwardedRef<RefTo> },
    Result,
    ManualRender
  >;
}

/**
 * The end-user modal API, returned by {@link UseModalAPI}. This is what you
 * get when calling the hook returned by {@link createModal}. It's used to
 * show or render the modal.
 */
export interface ModalHookAPI<Props, Result, ManualRender extends boolean> {
  /** Shows the modal. */
  show: boolean extends ManualRender
    ? keyof Props extends never
      ? () => Promise<Result | undefined>
      : (props: Props) => Promise<Result | undefined>
    : () => Promise<Result | undefined>;

  /** The modal component that renders portal with the component allowing to
   * pass props directly. Set when manual render is enabled. */
  Component: false extends ManualRender ? never : React.FC<Props>;
}

/**
 * The internal modal state, contains the current modal info used to render.
 */
export interface ModalState<Props, Result> {
  /** The active modal component. */
  Component: React.FC<ModalPropsIntersection<Props, Result>>;
  /** The active modal props. */
  props: Props;
  /** The active modal id. */
  id: string;
  /** The active modal options. */
  options: ModalOptions<boolean, boolean> | undefined;
  /** The set component function, to use when manual render is enabled.
   * It renders the portal and also the modal component. */
  setRenderComponent: (
    Component: React.FC<ModalPropsIntersection<Props, Result>>,
  ) => void;
  /** The flat promise object that resolves when the modal is closed. */
  promise: FlatPromise<Result>;
}

/**
 * The modals context value.
 */
export interface ModalsContextValue {
  /** The modal state. */
  modal: ModalState<any, any> | null;
  /** Sets the modal state. */
  setModal: <Props>(modal: ModalState<Props, any> | null) => void;
  /** Closes a modal by id. */
  closeModal: CloseModal;
}

/**
 * The close modal function.
 */
export type CloseModal = (id: string, reason: any) => void;
