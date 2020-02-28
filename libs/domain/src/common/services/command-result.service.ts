import { Injectable } from "@nestjs/common";
import { CommandBus, EventBus, ICommand, IEvent, IQuery, QueryBus } from "@nestjs/cqrs";
import { CommandResult } from "@responsekit/core";

// TODO: Refactor into a @responsekit/nestjs package.
@Injectable()
export abstract class CommandResultService {
    public constructor(
        private readonly _commandBus: CommandBus,
        private readonly _eventBus: EventBus,
        private readonly _queryBus: QueryBus
    ) { }

    public publish(event: IEvent): void {
        this._eventBus.publish(event);
    }

    public async query<T>(query: IQuery): Promise<CommandResult<T>> {
        return this._queryBus.execute(query);
    }

    public async send<T>(command: ICommand): Promise<CommandResult<T>> {
        return this._commandBus.execute(command);
    }
}
