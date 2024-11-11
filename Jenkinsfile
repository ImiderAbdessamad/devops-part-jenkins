pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify_id')
        NETLIFY_SITE_ID = 'cbe96a30-7591-4b4f-bfd7-b7ebe657d57c'
        // Ensure we use the tools installed on Jenkins
        NODEJS_HOME = tool 'NodeJS' // Make sure you have NodeJS installed in Jenkins Global Tool Configuration
        PATH = "${env.NODEJS_HOME}\\bin;${env.PATH}"
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
            steps {
                bat '''
                    echo "Node version:"
                    node --version
                    
                    echo "NPM version:"
                    npm --version
                    
                    echo "Installing dependencies..."
                    npm ci
                    
                    echo "Building project..."
                    npm run build
                    
                    echo "Listing build output:"
                    dir build
                '''
            }
        }

        stage('Test') {
            steps {
                bat '''
                    echo "Running tests..."
                    IF exist "build\\index.html" (
                        echo "Build verified - index.html exists"
                    ) ELSE (
                        echo "Error: build/index.html not found"
                        exit 1
                    )
                    npm test
                '''
            }
            post {
                always {
                    junit allowEmptyResults: true, testResults: 'src/tests-results/Junit.xml'
                }
            }
        }

        stage('Deploy') {
            steps {
                bat '''
                    echo "Installing Netlify CLI..."
                    npm install netlify-cli --no-save
                    
                    echo "Netlify CLI version:"
                    .\\node_modules\\.bin\\netlify --version
                    
                    echo "Deploying to Netlify..."
                    .\\node_modules\\.bin\\netlify deploy --prod --dir=build --site=%NETLIFY_SITE_ID% --auth=%NETLIFY_AUTH_TOKEN%
                '''
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed! Check the logs above for details.'
        }
    }
}