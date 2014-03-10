Trie = function(){
  this.characters = {};
  this.isWord = undefined;
};

var rootTrie = new Trie();
Trie.prototype.learn = function(word, index) {
  if (typeof index === "undefined" || index === null) {
    index = 0;
  }

  if (index === word.length) {
    this.isWord = true;
  } else {
    if (this.characters[word[index]] !== undefined) {
      return this.characters[word[index]].learn(word, index + 1);
    } else {
      this.characters[word[index]] = new Trie();
      return this.characters[word[index]].learn(word, index + 1);
    }
  }
};

Trie.prototype.getWords = function(words, currentWord){
currentWord = currentWord || '';
  words = words || [];

  if (this.isWord === true) {
    words.push(currentWord);
  }

  for (var key in this.characters) {
    newWrd = currentWord + key;
    this.characters[key].getWords(words, newWrd);
  }
  return words;
};

Trie.prototype.find = function(word, index){
  if (typeof index === "undefined" || index === null){
    index = 0;
  }
    if (this.characters[word[index]] !== undefined) {
    return (this.characters[word[index]]).find(word, index + 1);
    } else if (index === word.length) {
      return this;
  } else {
    return false;
  }

};

Trie.prototype.autoComplete = function(prefix){
  if (this.find(prefix) === false) {
    return [];
  } else {
    var result = this.find(prefix).getWords();
    var answer = [];
    for (var i = 0; i < result.length; i ++) {
      word = prefix.concat(result[i]);
      answer.push(word); 
    }

    return answer;
  }

};

// the autocomplete function

  // This function will return all completions 
  // for a given prefix.
  // It should use find and getWords.


// the get words function:
  // This function will return all the words which are
  // contained in this Trie.
  // it will use currentWord as a prefix,
  // since a Trie doesn't know about its parents.

// the find function
  // This function will return the node in the trie
  // which corresponds to the end of the passed in word.

  // Be sure to consider what happens if the word is not in this Trie.

// the learn function:
  // This function should add the given word,
  // starting from the given index,
  // to this Trie.

  // It will be recursive.  It will tell
  // the correct child of this Trie to learn the word
  // starting from a later index.

  // Consider what the learn function should do
  // when it reaches the end of the word?
  // A word does not necessarily end at a leaf.
  // You must mark nodes which are the ends of words,
  // so that the words can be reconstructed later.