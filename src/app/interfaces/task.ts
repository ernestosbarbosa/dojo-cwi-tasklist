import { Time } from '@angular/common';

export interface Task {
    name: string
    id? : string
    time?: Time
    done?: boolean
}
