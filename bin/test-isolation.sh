#!/bin/bash

# Script for testing changes in isolation

# Default ports for different versions
WEB_PORT=4001
DESKTOP_PORT=4000

# Function to run web version
run_web() {
    echo "🌐 Starting web version on port $WEB_PORT..."
    PORT=$WEB_PORT pnpm run dev
}

# Function to run desktop version
run_desktop() {
    echo "🖥️ Starting desktop version on port $DESKTOP_PORT..."
    PORT=$DESKTOP_PORT pnpm run electron-dev
}

# Create temporary test environment
setup_test_env() {
    BRANCH_NAME=$1
    TEST_DIR="test-environments/$BRANCH_NAME"
    
    echo "🔨 Setting up test environment in $TEST_DIR..."
    mkdir -p "$TEST_DIR"
    cp -r src package.json pnpm-lock.yaml "$TEST_DIR"
    
    cd "$TEST_DIR"
    pnpm install
}

# Parse command line arguments
case "$1" in
    "web")
        run_web
        ;;
    "desktop")
        run_desktop
        ;;
    "test")
        if [ -z "$2" ]; then
            echo "Please provide a branch name for testing"
            exit 1
        fi
        setup_test_env "$2"
        run_web
        ;;
    *)
        echo "Usage: $0 {web|desktop|test <branch-name>}"
        exit 1
        ;;
esac
