class propertie{
  
  constructor(Name, Type, Value){
    
    this.name = Name;
    this.type = Type;
    this.value = Value;
    this.min = 0;
    this.max = 9999;
    this.step  = 0;
    this.hidden = false;
    
  }
  
  setMin(Min){ this.min = Min; }
  setMax(Max){ this.max = Max; }
  setStep(Step){ this.step = Step; }
  setHidden(Hidden){ this.hidden = Hidden; }
  
}