package common.util;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.assertThat;

import org.junit.Test;

public class EncryptorUtilTest {
    
    @Test
    public void encodePassphrase(){
        assertThat(CryptoUtil.encodePassphrase("test", "ChV/fBdO3xTlThXkWSAfWw=="), equalTo("ypfvEXFxp7gns23lHd8HXeXk6V3VFOmeYs"
                + "7xSLVenfE9OVMvmfcLmclJdbXTP8wVZQJoqINp6r4KzqX99MAlvw=="));
    }

    @Test
    public void testMD5() throws Exception {
        assertThat(CryptoUtil.md5("123456"), equalTo("e10adc3949ba59abbe56e057f20f883e"));
        assertThat(CryptoUtil.md5("654321"), equalTo("c33367701511b4f6020ec61ded352059"));
    }

    @Test
    public void testSHA1() {
        assertThat(CryptoUtil.sha1("123456"), equalTo("7c4a8d09ca3762af61e59520943dc26494f8941b"));
    }

    @Test
    public void testHexCrypo() {
        String source = "hello world 1 !";
        assertThat(CryptoUtil.hex2Str(CryptoUtil.str2Hex(source)), equalTo(source));
    }
    
    @Test
    public void str2Hex() {
        String str = "It is a test!";
        assertThat(CryptoUtil.str2Hex(str), equalTo("49742069732061207465737421"));
    }
    
    @Test
    public void hex2Str() {
        String str = "49742069732061207465737421";
        assertThat(CryptoUtil.hex2Str(str), equalTo("It is a test!"));
    }
    
    @Test
    public void encryptAES(){
        String str = "It is a test!";
        assertThat(CryptoUtil.encryptAES(str), equalTo("6CgTYbTrHC0Dpm72c0n6Bg=="));
    }
    
    @Test
    public void decryptAES(){
        String str = "6CgTYbTrHC0Dpm72c0n6Bg==";
        assertThat(CryptoUtil.decryptAES(str), equalTo("It is a test!"));
    }
}
