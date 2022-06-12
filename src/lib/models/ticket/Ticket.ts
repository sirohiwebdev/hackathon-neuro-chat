

export  enum TicketStatus {
    OPEN = "open",
    PROGRESS = "progress",
    CLOSED = "closed"

}


export interface Ticket {
    queryId: string;
    assignee: string;
    status: TicketStatus;
    id: string;
}