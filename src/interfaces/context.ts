
import Outgoing from './outgoing'

export default interface Context {
    incoming: any
    outgoing?: Outgoing
    latency?: any
    validate?: any
}