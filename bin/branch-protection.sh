#!/bin/bash

# Script for setting up branch protection rules
# Requires GitHub CLI (gh) to be installed and authenticated

# Function to set up branch protection rules
setup_branch_protection() {
    BRANCH=$1
    
    echo "🔒 Setting up protection rules for $BRANCH branch..."
    
    # Require pull request reviews before merging
    gh api \
      --method PUT \
      -H "Accept: application/vnd.github.v3+json" \
      "/repos/YASHYASHKINGGOD/neo-notes/branches/$BRANCH/protection" \
      -f required_status_checks='{"strict":true,"contexts":[]}' \
      -f enforce_admins=true \
      -f required_pull_request_reviews='{"dismissal_restrictions":{},"dismiss_stale_reviews":true,"require_code_owner_reviews":true,"required_approving_review_count":1}' \
      -f restrictions=null
}

# Set up protection for main branches
setup_branch_protection "main"
setup_branch_protection "development"

echo "✅ Branch protection rules set up successfully"
