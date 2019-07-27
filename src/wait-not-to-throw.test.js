import {waitNotToThrow} from "./index"

describe('waitNotToThrow', () => {
  it('should throw if cb does not stop throwing within default timeout', async (done) => {
    const expectedErrorMessage = 'blaah, im failing';
    const failing = () => {
      throw new Error(expectedErrorMessage)
    };
    await expect(waitNotToThrow(failing))
      .rejects.toThrow(`Still rejecting after 100ms: ${expectedErrorMessage}`);
    done();
  });

  it('should throw if cb does not stop throwing within a set timeout', async (done) => {
    const expectedErrorMessage = 'blaah, im failing';
    const failing = () => {
      throw new Error(expectedErrorMessage)
    };

    await expect(waitNotToThrow(failing, 2))
      .rejects.toThrow(`Still rejecting after 2ms: ${expectedErrorMessage}`);
    done();
  });

  it('should not throw if the cb does not throw', async (done) => {
    await expect(waitNotToThrow(() => {})).resolves.toEqual(undefined);
    done();
  });

  it('should not throw if cb stops throwing within the timeout period', async (done) => {
    const expectedErrorMessage = 'blaah, im failing';
    let intervalId;
    let timeLapsed = 0;
    const failing = () => {
      if(!intervalId) {
        intervalId = setInterval(() => {
          timeLapsed ++;
        }, 2);
      }
      if(timeLapsed > 20) {
        return;
      }
      throw new Error(expectedErrorMessage);
    };
    await expect(waitNotToThrow(failing)).resolves.toEqual(undefined);
    done();
  });
});