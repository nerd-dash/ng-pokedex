import { StateService } from 'src/app/services/state/state.service';

export class ServiceStateSpy implements ServiceStateSpy {
  constructor(private service: StateService<any>) {}

  public setState = spyOn(this.service as any, 'setState').and.callThrough();
  public select = spyOn(this.service as any, 'select').and.callThrough();
}

export interface ServiceStateSpy {
  select: jasmine.Spy<any>;
  setState: jasmine.Spy<any>;
}
