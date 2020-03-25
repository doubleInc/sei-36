// Imports
const { path } = R;
const { Observable } = Rx;

//stream!
Observable.fromEvent(document, "scroll")
  .map(e => window.pageYOffset)
  .pairwise()
  .subscribe(pair => console.log(pair));
