export class TermAdditionStatus {
    static readonly CURRENT =  new TermAdditionStatus( "current", false, "translation-addition-tile.button.add" );
    static readonly LOADING =  new TermAdditionStatus( "loading", true, "translation-addition-tile.button.add");
    static readonly SUCCESSFULL = new TermAdditionStatus( "successful", false, "translation-addition-tile.button.copy" );
    static readonly UNSUCCESSFULL = new TermAdditionStatus( "unsuccessful", false, "translation-addition-tile.button.copy" );
  
    private constructor(public readonly key: string, 
                        //public readonly iconName: string, 
                        //public readonly areInputsDisabled: boolean,
                        public readonly btnDisabled: boolean,
                        public readonly btnLabel: string) {}
  }