pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify_id')
        NETLIFY_SITE_ID = 'cbe96a30-7591-4b4f-bfd7-b7ebe657d57c'
    }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'master', 
                    url: 'https://github.com/ImiderAbdessamad/devops-part-jenkins.git', 
                    credentialsId: 'github_token'
            }
        }
        
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    // Remove workspace mounting since Jenkins handles this
                    reuseNode true
                }
            }
            steps {
                script {
                    // Use bat for Windows, sh for Linux
                    if (isUnix()) {
                        sh '''
                            node --version
                            npm --version
                            npm ci
                            npm run build
                            ls -la
                        '''
                    } else {
                        bat '''
                            node --version
                            npm --version
                            npm ci
                            npm run build
                            dir
                        '''
                    }
                }
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                            test -f build/index.html
                            npm test
                        '''
                    } else {
                        bat '''
                            if not exist build\\index.html exit 1
                            npm test
                        '''
                    }
                }
            }
            post {
                always {
                    junit allowEmptyResults: true, testResults: 'src/tests-results/Junit.xml'
                }
            }
        }

        stage('Deploy') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                            npm install netlify-cli
                            ./node_modules/.bin/netlify --version
                            ./node_modules/.bin/netlify deploy --prod --dir=build --site=$NETLIFY_SITE_ID --auth=$NETLIFY_AUTH_TOKEN
                        '''
                    } else {
                        bat '''
                            npm install netlify-cli
                            .\\node_modules\\.bin\\netlify --version
                            .\\node_modules\\.bin\\netlify deploy --prod --dir=build --site=%NETLIFY_SITE_ID% --auth=%NETLIFY_AUTH_TOKEN%
                        '''
                    }
                }
            }
        }
    }
}