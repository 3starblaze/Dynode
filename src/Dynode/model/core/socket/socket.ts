import { VEvent, VEventTarget } from 'src/utils/vanillaEvent';
import { SocketValue, SocketValueType } from './value';

/**
 * Class for dealing with Node values.
 */
class Socket<T> extends VEventTarget {
  /**
   * ValueConstructor that is used to determine the type of value.
   */
  protected SocketValueType: SocketValueType<T>;

  /**
   * The Value of the socket. null means there is nothing.
   */
  protected socketValue: SocketValue<T> | null;

  /**
   * Denotes whether the object's value has been set.
   *
   * Although it may seem that when value = null the value has not been set, that is not
   * the case. When value = null and isSetVariable = true it's an explicit signal that there
   * is no value.
   */
  private isSetVariable: boolean;

  /**
   * Identifier used to retrieve the socket.
   */
  public name: string | null = null ;

  /**
   * A name used for display.
   */
  public title: string | null = null;

  constructor(socketValueType?: SocketValueType<T>) {
    super();
    this.SocketValueType = socketValueType || SocketValue;
    this.socketValue = null;
    this.isSetVariable = false;
  }

  /**
   * Throw away the stored value making the value unset.
   *
   * See {@link isSetVariable} on the difference between nothing and unset.
   */
  public clear(): void {
    this.socketValue = null;
    this.isSetVariable = false;
  }

  /**
   * Revert socket to a fresh state.
   *
   * It is used for resetting the socket for a clean run for a network.
   */
  public reset(): void {
    this.clear();
  }

  /**
   * Object's setter for {@link value}
   */
  public setValue(value: T): void {
    if (this.isSet()) throw Error('Value already set');
    this.socketValue = new this.SocketValueType(value);
    this.isSetVariable = true;
    this.dispatchEvent(new VEvent('value'));
  }

  /**
   * Remove value and thus setting value to nothing.
   */
  public setNothing(): void {
    this.socketValue = null;
    this.isSetVariable = true;
  }

  /**
   * Retrieve this socket's socketValue.
   */
  public getSocketValue(): SocketValue<T> {
    if (!this.isSet()) throw Error('Socket is not set');
    if (this.isNothing()) throw Error('Socket has no value');
    return this.socketValue as SocketValue<T>; // Can be cast because of "nothing" check
  }

  /**
   * Retrieve this socket's value.
   */
  public getValue(): T {
    return this.getSocketValue().value;
  }

  /**
   * Denotes whether the object's value has been set.
   */
  public isSet(): boolean {
    return this.isSetVariable;
  }

  /**
   * Denotes whether the object's value is set to nothing.
   */
  public isNothing(): boolean {
    return this.isSet() && (this.socketValue === null);
  }
}

export default Socket;
