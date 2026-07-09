pipeline {
    agent any

    environment {
        IMAGE_NAME = "devopslearningventra/busapp-nodejs:${BUILD_NUMBER}"
        NODE_HOME = "C:\\Program Files\\nodejs"
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

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'devopslearningventra',
                        passwordVariable: 'Shakthyshree@09'
                    )
                ]) {
                    bat '''
                    docker login -u %devopslearningventra% -p %Shakthyshree@09%
                    docker push %IMAGE_NAME%
                    '''
                }
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