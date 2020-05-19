pipeline {
  agent none
  environment {
    DOCKERHUBNAME = "ssn717"
  }
  stages {
    stage('Build') {
      agent {
        docker {
          image 'node'
          args '-p 3000:3000'
        }
      }
      steps {
        echo 'start npm install...'
        sh 'npm install'
        echo 'start npm build...'
        sh 'npm run build'
        echo 'npm install and build successfully!'
      }
    }

    stage('docker build & push & run') {
      agent any
      steps {
        script {
          def REMOVE_FLAG_C = sh(returnStdout: true, script: "docker container ls -q --filter name=.*fsdui.*") != ""
          echo "REMOVE_FLAG_C: ${REMOVE_FLAG_C}"
          if(REMOVE_FLAG_C){
            sh 'docker container rm -f $(docker container ls -q --filter name=.*fsdui.*)'
          }
          def REMOVE_FLAG = sh(returnStdout: true, script: "docker image ls -q *${DOCKERHUBNAME}/fsdui*") != ""
          echo "REMOVE_FLAG: ${REMOVE_FLAG}"
          if(REMOVE_FLAG){
            sh 'docker image rm -f $(docker image ls -q *${DOCKERHUBNAME}/fsdui*)'
          }
        }

        withCredentials([usernamePassword(credentialsId: 'ssn717ID', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          // sh 'docker login -u $USERNAME -p $PASSWORD'
          sh 'docker image build -t ${DOCKERHUBNAME}/fsdui .'
          sh 'docker run -d -p 4200:80 --memory=400M --name fsdui ${DOCKERHUBNAME}/fsdui'
        }
      }
    }

    stage('clean workspace') {
      agent any
      steps {
        // clean workspace after job finished
        cleanWs()
      }
    }
  }
}


