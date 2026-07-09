pipeline {
    agent any

    environment {
        IMAGE_NAME = "devopslearningventra/busapp-nodejs:${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Source code already checked out by Jenkins."
            }
        }

        stage('Check Environment') {
            steps {
                bat 'echo PATH=%PATH%'
                bat 'where node'
                bat 'where npm'
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Push Docker Image') {
            steps {
                bat 'docker push %IMAGE_NAME%'
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