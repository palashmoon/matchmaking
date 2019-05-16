import { SearchModule } from './search.module';

describe('SearchmoduleModule', () => {
  let searchModule: SearchModule;

  beforeEach(() => {
    searchModule = new SearchModule();
  });

  it('should create an instance', () => {
    expect(searchModule).toBeTruthy();
  });
});
