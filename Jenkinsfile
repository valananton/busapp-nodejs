pipeline {
    agent any

    environment {
        IMAGE_NAME = "devopslearningventra/busapp-nodejs:${BUILD_NUMBER}"
        NODE_HOME = "C:\\Program Files\\nodejs"
        SCANNER_HOME = tool 'SonarScanner'
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Source code already checked out by Jenkins."
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '"%NODE_HOME%\\node.exe" -v'
                bat '"%NODE_HOME%\\npm.cmd" -v'
                bat '"%NODE_HOME%\\npm.cmd" install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    bat """
                    "%SCANNER_HOME%\\bin\\sonar-scanner.bat" ^
                    -Dsonar.projectKey=busapp-nodejs ^
                    -Dsonar.projectName=busapp-nodejs ^
                    -Dsonar.sources=. ^
                    -Dsonar.host.url=http://localhost:9000
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credential',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    bat '''
                    docker login -u %DOCKER_USER% -p %DOCKER_PASS%
                    docker push %IMAGE_NAME%
                    '''
                }
            }
        }

        stage('Deploy Container') {
            steps {
                bat '''
                docker stop busapp || exit 0
                docker rm busapp || exit 0
                docker run -d --name busapp -p 3000:3000 %IMAGE_NAME%
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed.'
        }
    }
}