package com.tavi.cilideafricaneb.demo.security;

public class AuthTokenData {
    private String token;

    public AuthTokenData() { }

    public AuthTokenData(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
