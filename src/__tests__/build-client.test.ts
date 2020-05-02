import {GenerateSDK} from "../build-client";

test('Wrong options input', () => {
    expect.assertions(1);
    return GenerateSDK({
        outPath: '/'
    }).catch(e =>
        expect(e).toEqual(new Error('at least one of spec or specURL should be provided'))
    );
});
