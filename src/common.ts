import {QueryStatus} from "./lib/models";

export const badgeColor = {
    [QueryStatus.OPEN]: 'blue',
    [QueryStatus.PENDING]: 'yellow',
    [QueryStatus.RESOLVED]: 'green',
}