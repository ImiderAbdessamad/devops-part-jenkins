pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify_id') // Jenkins credential ID for Netlify token
        NETLIFY_SITE_ID = 'cbe96a30-7591-4b4f-bfd7-b7ebe657d57c' // Replace with your actual Netlify Site ID
    }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/ImiderAbdessamad/devops-part-jenkins.git', credentialsId: 'github_token'
            }
        }
        
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    args '-v /var/run/docker.sock:/var/run/docker.sock -w /workspace' // Set workspace in Docker
                }
            }
            environment {
                HOME = "/workspace" // Set home to workspace to avoid issues
            }
            steps {
                sh '''
                    mkdir -p /workspace
                    cd /workspace
                    ls -la
                    node --version
                    npm --version
                    npm ci
                    npm run build
                    ls -la
                '''
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:18-alpine'
                    args '-v /var/run/docker.sock:/var/run/docker.sock -w /workspace'
                }
            }
            environment {
                HOME = "/workspace"
            }
            steps {
                sh '''
                    cd /workspace
                    test -f build/index.html
                    npm test
                '''
            }
            post {
                always {
                    junit 'src/tests-results/Junit.xml'
                }
            }
        }

        stage('Deploy') {
            agent {
                docker {
                    image 'node:18-alpine'
                    args '-v /var/run/docker.sock:/var/run/docker.sock -w /workspace'
                }
            }
            environment {
                HOME = "/workspace"
            }
            steps {
                sh '''
                    npm install netlify-cli
                    node_modules/.bin/netlify --version
                    node_modules/.bin/netlify deploy --prod --dir=build --site=$NETLIFY_SITE_ID --auth=$NETLIFY_AUTH_TOKEN
                '''
            }
        }
    }
}
