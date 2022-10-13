function shuffle(array) {
    const newarr = array
    let currentIndex = newarr.length,  randomIndex;
    // While there remain newarr to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [newarr[currentIndex], newarr[randomIndex]] = [
        newarr[randomIndex], newarr[currentIndex]];
    }
  
    return newarr;
  }

  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

export {shuffle, makeid}