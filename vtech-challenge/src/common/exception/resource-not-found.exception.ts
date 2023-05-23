import { AbstractResourceNotFoundException } from '../abstract';

export class ResourceNotFoundException extends AbstractResourceNotFoundException {
  constructor(resource: string, identifier?: string | number) {
    super(resource, identifier);
  }
}
