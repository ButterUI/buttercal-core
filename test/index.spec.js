/* global describe, it, before */

import chai from 'chai';
import AbstractDate from "../src/AbstractDate";

chai.expect();

const expect = chai.expect;

let abstract1, abstract2;

describe('Given I have two abstract dates created in the same day but with different times', () => {
  before(() => {
    abstract1 = new AbstractDate(new Date('1995-12-17t03:24:00'));
    abstract2 = new AbstractDate(new Date('1995-12-17T01:24:00'));
  });
  describe('when I call the equals() method', () => {
    it('should return true', () => {
      expect(abstract1.equals(abstract2)).to.be.equal(true);
    });
  });
});
