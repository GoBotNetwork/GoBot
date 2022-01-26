attempt_counter=0
max_attempts=10
interval=60

until $(curl --output /dev/null --silent --head --fail https://localhost/api/); do
    if [ ${attempt_counter} -eq ${max_attempts} ];then
      echo "Max attempts reached"
      exit 1
    fi

    printf '.'
    attempt_counter=$(($attempt_counter+1))
    sleep ${interval}
done