PATHS=(
"../static/img/philosophical_ramblings_about_ecology_programming_languages_and_OOP_not_java/"
"../static/img/"
"../static/img/my_personal_tech_limbo_elixir_vs_rust/"
)

function convert_image {
    ls | grep -E "(large|medium|small|tiny)" | xargs rm
    ls | grep -E "[0-9]{1,4}x[0-9]{1,4}\.[^.]{3,4}" | xargs rm
}

if [[ "$1" == "delete-tests" ]]; then
    convert_image
    exit 0
fi


if [[ "$1" == "delete-img" ]]; then
for path in "${PATHS[@]}"; do
    cd $path
    echo "Cleaning $path"
    convert_image
    cd -
done
    exit 0
fi

if [[ "$1" == "create-img" ]]; then
for path in "${PATHS[@]}"; do
    echo "Generating in $path"
    RUST_BACKTRACE=1 cargo run -- $path
done
    exit 0
fi
