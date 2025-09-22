pipeline {
  environment {
    AWS_ACCOUNT_ID = "671957687390"
    AWS_DEFAULT_REGION = "ap-south-1"
    AWS_REPO = "communn-templates"
    IMAGE_TAG = "v1.${env.BUILD_NUMBER}"
    AWS_REPOSITORY_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${AWS_REPO}"
    
  }
  // credentialsId: 'gmail', 
  agent any
  stages {
   
    stage('Checkout'){
      steps{
      git branch: 'main', credentialsId: 'github-communn', url: 'https://github.com/onecommunn/communn-templates-new.git'
      }
    }
     stage('AWS ECR Login') {
      steps{
        script {
          sh "aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
        }
      }
    }
    stage('Pruning') {
        steps{
        script {
         sh "docker container prune --force && docker image prune -a --force && docker volume prune --force && docker builder prune --all --force"
        }
        }
    }
    stage('Building image'){
      steps{
        script{
          sh "docker build -t ${AWS_REPO}:${IMAGE_TAG} ."
        }
      }
    }
    stage('Tag image'){
      steps{
        script{
          sh "docker tag ${AWS_REPO}:${IMAGE_TAG} ${AWS_REPOSITORY_URI}:${IMAGE_TAG}"
          sh "docker tag ${AWS_REPO}:${IMAGE_TAG} ${AWS_REPOSITORY_URI}:latest"
        }
      }
    }
    stage('Push to ECR'){
      steps{
        script{
          sh "docker push ${AWS_REPOSITORY_URI}:${IMAGE_TAG}"
           sh "docker push ${AWS_REPOSITORY_URI}:latest"
        }
      }
    }
  }
   post {
    always {
      cleanWs()
    }
  }
}