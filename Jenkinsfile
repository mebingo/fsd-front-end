pipeline {
  agent none
  environment {
    DOCKERHUBNAME = "liker163"
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
          def REMOVE_FLAG_C = sh(returnStdout: true, script: "docker container ls -q --filter name=.*smcui.*") != ""
          echo "REMOVE_FLAG_C: ${REMOVE_FLAG_C}"
          if(REMOVE_FLAG_C){
            sh 'docker container rm -f $(docker container ls -q --filter name=.*smcui.*)'
          }
          def REMOVE_FLAG = sh(returnStdout: true, script: "docker image ls -q *${DOCKERHUBNAME}/smcui*") != ""
          echo "REMOVE_FLAG: ${REMOVE_FLAG}"
          if(REMOVE_FLAG){
            sh 'docker image rm -f $(docker image ls -q *${DOCKERHUBNAME}/smcui*)'
          }
        }

        withCredentials([usernamePassword(credentialsId: 'liker163ID', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          // sh 'docker login -u $USERNAME -p $PASSWORD'
          sh 'docker image build -t ${DOCKERHUBNAME}/smcui .'
          // sh 'docker push ${DOCKERHUBNAME}/smcui'
          // sh 'docker run -d -p 4200:80 --network smc-net --name smcui ${DOCKERHUBNAME}/smcui'
          sh 'docker run -d -p 4200:80 --memory=400M --name smcui ${DOCKERHUBNAME}/smcui'
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


