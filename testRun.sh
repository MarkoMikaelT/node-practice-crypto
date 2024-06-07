#!/bin/bash

# Base URL for the API
BASE_URL="http://localhost:38080/v1"

# Root endpoint
echo "Calling Root Endpoint:"
curl -X GET "$BASE_URL/"
echo

# Hash password
PASSWORD="my_password"
echo "Calling /hash Endpoint:"
curl -X POST "$BASE_URL/hash?password=$PASSWORD"
echo

# Hash same password
echo "Calling /hash Endpoint:"
curl -X POST "$BASE_URL/hash?password=$PASSWORD"
echo

# Get all passwords
echo "Calling /getAllPasses Endpoint:"
curl -X GET "$BASE_URL/getAllPasses"
echo

# Hash login
echo "Calling /hashLogin Endpoint:"
curl -X GET "$BASE_URL/hashLogin?password=$PASSWORD"
echo

# Signup
EMAIL="test@example.com"
echo "Calling /signup Endpoint:"
curl -X POST "$BASE_URL/signup?email=$EMAIL&password=$PASSWORD"
echo

# Login
echo "Calling /login Endpoint:"
curl -X GET "$BASE_URL/login?email=$EMAIL&password=$PASSWORD"
echo

# Login fail
echo "Calling /login Endpoint:"
curl -X GET "$BASE_URL/login?email=$EMAIL&password=asdasd"
echo

# Hmac add
echo "Calling /hmac Endpoint:"
curl -X POST "$BASE_URL/hmac?message=123"
curl -X POST "$BASE_URL/hmac?message=321"
curl -X POST "$BASE_URL/hmac?message=Moikkeliskoikkelis"
echo
# Hmac get all
echo "Calling /gethmac Endpoint:"
curl -X GET "$BASE_URL/gethmac"
echo
# Hmac check true
echo "Calling /checkhmac Endpoint:"
curl -X GET "$BASE_URL/checkhmac?message=123"
echo
# Hmac check false
echo "Calling /checkhmac Endpoint:"
curl -X GET "$BASE_URL/checkhmac?message=asdasd"
echo