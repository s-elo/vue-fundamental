export default class Scanner {
  constructor(tempStr) {
    this.tempStr = tempStr;

    // the scann postion when scanning the tempStr
    this.pos = 0;

    // the rest str after this.pos
    this.tail = tempStr;
  }

  skip(stopTag) {
    if (this.tail.indexOf(stopTag) === 0) {
      // skip the stopTag
      this.pos += stopTag.length;
      // update the tail
      this.tail = this.tempStr.slice(this.pos);
    }
  }

  scan(stopTag) {
    const startPos = this.pos;

    // not the end of the str and havenot scan to the stoptag
    while (!this.eos() && this.tail.indexOf(stopTag) !== 0) {
      this.pos++;
      // update the tail
      this.tail = this.tempStr.slice(this.pos);
    }

    return this.tempStr.slice(startPos, this.pos);
  }

  eos() {
    // when end of string, return true
    return !(this.pos < this.tempStr.length);
  }
}
