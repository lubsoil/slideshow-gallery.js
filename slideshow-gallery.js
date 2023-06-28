class SlideshowGallery {
    constructor(canvasId, images, options = {}) {
        this.canvasElement = document.getElementById(canvasId);
        this.options = options;

        let canvasStyle = window.getComputedStyle(this.canvasElement);

        //GENERATING OPTIONS VALUE IF NOT CREATED
        if (this.options['width'] == undefined) {
            this.options['width'] = this.canvasElement.clientWidth;
        }
        if (this.options['height'] == undefined) {
            this.options['height'] = this.canvasElement.clientHeight;
        }
        if (this.options['automaticSlideshowTimer'] == undefined) {
            this.options['automaticSlideshowTimer'] = 15000;
        }
        if (this.options['galleryButtons'] == undefined) {
            this.options['galleryButtons'] = {};
        }
        if (this.options.galleryButtons['prevButton'] == undefined) {
            this.options.galleryButtons['prevButton'] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAABkCAYAAAAMhImNAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNv1OCegAAALQSURBVGhDzZstUBxBFIQRiIgIREQkIgKBQERERCCRyAgEEoGIjECkKiIiIiIiAoFAIJGREREIBAKBQJxAREYgEIhL99Tt1vy82boTXdVd9W3tjLieurvdefPmzdp8Pl+Fz0ClWWQ4xS+g0kVkOMUjUOk4MuyxA5TaiUx7HAOV/oG1yLTHBVCJ/8WVBvMAVPoElh7MJlBqFyw9mA9ApWfwAiw9mB9ApSuQfGrTHjdApW8g+dSmERtAqX2QvGrjiD2g1CuQvGrjiC9ApTsweuWmPX4DlU7B6JWbRqwD5eR4CEa/3DjiHVDqDRj9cuOIj0Clv6DwKxoBl0AlfnbhVzQCOHqV+K0XfkWjgr+nUm9B4Vk0KvhPV4lPKJ/UwrNoVPAdoBLfXY1n05HBt6NKXPI0nk3HAvXkyPmu8W06FnAmVYnB1EvQ+DYdC74ClRgbRZ7dwfwBKn0HkWc4GMajT0AlxtORbziY90Cp1yDyDQfDNYxKMxB5JqJO5eR4DiLPRNTJda9KRyDyTNQdW0CpbVB7jtQdHLlKKdMwRd1xBlRqgqmauuMeqJQyDVPkDT7/SvH9lfs15A3l5Mg3eso0TJE3OGeoxLku9wrJG9dAJUYBuVfIcMP4gnGGSmOmYYrhhmkspRg5FsYRw80JUOkWFKY9hhtlGv4nKEx7DDfKTMMBKEx78KJOwzNt2xhH8KJMwzeZhil4Uabh+dmNaQ9eGAqq1GQapuDFajBWP5PVH9jq0SY2Lz1iNR1YTZRWIYRVcEVswk5iFZBbLVWsFnHEZnlLrBb+VikRq2QRsUmjEasEo1Xq1SopbZWuJzYbGcRqi8dq88tqW5DYbJgSq61kq012q/IDYlOYQZSTZhNsFY0Aq2IeqzInqwIwYlMaR6yKBq3KKa0KTYlNCS6xKk62Ktu2KmgnNqX+xOoQhNXxEKuDM0Q5aa50pIhYHbYSHkObz/4DfjfzGAOSbmUAAAAASUVORK5CYII=";
        }
        if (this.options.galleryButtons['nextButton'] == undefined) {
            this.options.galleryButtons['nextButton'] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAABkCAYAAAAMhImNAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNv1OCegAAALJSURBVGhDzZstcBRBFIQjEAgEIgIZEYFAnIhARCAjkRERyIgTSASCqggEIiICgUAgIiMjEREREREREYgTCCQCgUBsuqfYrfl5s3Unuqq76rvaGXE9tbc38+bN261hGFZApQ+AHmvBj3Og0iVoTHvwYwlU+gMa0x78WACl+P2NccR48RuoxDtfmPYYL/jbqsRnsjDtMV68Ayr9BIVpj/HiFVBqBxTGEePFY/APqHQICuOIvHENVDoDuVdI3vgEVLoFuVdI3ngNlHoKcr+GvLENlDoAuV9D3XEPVDoBtV9B3fEFqPQd1H4FdccboBIXzUeg9pyoO3aBUi9B7TkRdf4CKr0FkWci6rwAKvG7I89E1MnRq8S7Hnkmos49oBSfy8g3HAyfeD75KvEfG/mGgyGcE1TiXBZ5dgfDLYZKnOUjz+5guI4oFS6aTcd/ngBlsMUIofFtOjIYg6j0ETSeTUfGKVDpCjSeTUcG41aV/gLG3YVn0ah4BpTaB4Vn0QhQZii4Vyv8ikbAN6BSs2gWjYBjoBL394Vf0Qh4AZR6Dia/3LiHMkPBOz955aY9lMHWVzB55aY9lBmKH2Dyyk17cD5QivNZ8qqNIzhTcsZUaVo0a+MeXEtU4hqYfGrTHlxlVboByac27aHMUDBuYvy09mAYmSnFNN7agyF3QKX3YKPBfAYqpbR+ZNrjCKiU0vqRaQ+mT5VaRKZzKDMUy8hwDuVx0HlkOIcyQ7GKDOewGozVz2TzAFv9ta0mPavlwGahtAohrIIrq7DTJiC32qpYbeKstrdWG3+blIhVssgqjWaVYLRJvVolpa3S9VYHGTZHPFaHX1bHglYHpjZHyVaH7FblB1aFGcpgqlkcc6JOm2IeqzInqwIwq9I4m6JBq3JKZaaB2qjQ1KoE16Y42aps26qg3arU3+olCJvXQ6xenLF6pcjqZSuT19CGrQeLePMY9/7sLwAAAABJRU5ErkJggg==";
        }

        this.automaticSlideshow = {
            paused: false,
            timer: 0
        };

        this.moveAnimation = {
            enabled: false,
            timer: 0,
            maxTimer: 650,
            previousPhotoId: 0,
            animationDirection: "left"
        };

        this.galleryButtons = {
            prevButton: {
                image: new Image(),
                loaded: false
            },
            nextButton: {
                image: new Image(),
                loaded: false
            }
        }

        this.images = [];
        this.currentImage = 0;

        images.forEach(imgSrc => {
            this.addImage(imgSrc);
        });


        this.galleryButtons.prevButton.image.src = this.options.galleryButtons.prevButton;
        this.galleryButtons.nextButton.image.src = this.options.galleryButtons.nextButton;
        this.galleryButtons.prevButton.image.addEventListener("load", () => { this.galleryButtons.prevButton.loaded = true; }, false);
        this.galleryButtons.nextButton.image.addEventListener("load", () => { this.galleryButtons.nextButton.loaded = true; }, false);

        this.canvasElement.width = this.options.width;
        this.canvasElement.height = this.options.height;

        if (this.canvasElement.getContext) {
            window.requestAnimationFrame(() => { this.drawEvent(this); });
        }

        this.photoGalleryIntervalId = setInterval(() => this.photoGalleryInterval(), 10);
        this.canvasElement.addEventListener('mouseup', (e) => this.mouseUpEvent(this, e));
        window.addEventListener('resize', (e) => this.resizeEvent(this, e));
        window.addEventListener('load', (e) => this.resizeEvent(this, e));
    }

    nextImage() {
        this.moveAnimation.previousPhotoId = this.currentImage * 1;
        this.moveAnimation.enabled = true;
        this.moveAnimation.timer = 0;
        this.moveAnimation.animationDirection = "left";

        this.currentImage++;

        if (this.images.length <= this.currentImage) {
            this.currentImage = 0;
        }
        this.automaticSlideshow.timer = 0;
    };

    prevImage() {
        this.moveAnimation.previousPhotoId = this.currentImage * 1;
        this.moveAnimation.enabled = true;
        this.moveAnimation.timer = 0;
        this.moveAnimation.animationDirection = "right";

        this.currentImage--;
        if (this.currentImage < 0) {
            this.currentImage = this.images.length - 1;
        }
        if (this.currentImage < 0) {
            this.currentImage = 0;
        }
        this.automaticSlideshow.timer = 0;
    };

    addImage(imgSrc) {
        var imageObject = {
            image: new Image(),
            loaded: false
        };
        imageObject.image.src = imgSrc;
        imageObject.image.addEventListener("load", () => { imageObject.loaded = true; }, false);
        this.images.push(imageObject);
    };

    removeImage(id) {
        this.images.splice(id, 1);

        if (this.images.length <= this.currentImage) {
            this.currentImage = 0;
        }
    };

    getImage(id) {
        return this.images[id].image;
    };

    isImageLoaded(id) {
        if (this.images.length == 0) return false;
        if (this.images.length < id) return false;
        return this.images[id].loaded;
    };

    resize(width, height) {
        this.options.width = width;
        this.options.height = height;
        this.canvasElement.width = width;
        this.canvasElement.height = height;
    }

    resizeEvent(obj, event) {
        obj.resize(this.canvasElement.clientWidth, this.canvasElement.clientHeight)
    }

    mouseUpEvent(obj, event) {
        const rect = this.canvasElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        if (x >= 0 && x <= (obj.galleryButtons.prevButton.image.width) && y >= (this.options.height / 2) - (obj.galleryButtons.prevButton.image.height / 2) && y <= (this.options.height / 2) + (obj.galleryButtons.prevButton.image.height / 2)) {
            this.prevImage();
        } else if (x >= this.options.width - (obj.galleryButtons.nextButton.image.width) && x <= this.options.width && y >= (this.options.height / 2) - (obj.galleryButtons.nextButton.image.height / 2) && y <= (this.options.height / 2) + (obj.galleryButtons.nextButton.image.height / 2)) {
            this.nextImage();
        } else {
            this.automaticSlideshow.paused = !this.automaticSlideshow.paused;
        }
    };

    drawEvent(obj) {

        let ctx = obj.canvasElement.getContext("2d");

        ctx.clearRect(0, 0, obj.options.width, obj.options.height);

        //DRAWING PICTURE OR ANIMATION
        if (obj.moveAnimation.enabled == false) {
            if (obj.images.length > obj.currentImage && obj.currentImage >= 0 && obj.isImageLoaded(obj.currentImage)) {
                ctx.drawImage(obj.getImage(obj.currentImage), 0, 0, obj.options.width, obj.options.height);
            }
        } else {
            if (obj.moveAnimation.animationDirection == "left") {
                if (obj.isImageLoaded(obj.currentImage)) {
                    ctx.drawImage(obj.getImage(obj.currentImage), 0 + obj.options.width * (1 - (obj.moveAnimation.timer / obj.moveAnimation.maxTimer)), 0, obj.options.width, obj.options.height);
                }
                if (obj.isImageLoaded(obj.moveAnimation.previousPhotoId)) {
                    ctx.drawImage(obj.getImage(obj.moveAnimation.previousPhotoId), 0 - obj.options.width * (obj.moveAnimation.timer / obj.moveAnimation.maxTimer), 0, obj.options.width, obj.options.height);
                }
            } else if (obj.moveAnimation.animationDirection == "right") {
                if (obj.isImageLoaded(obj.currentImage)) {
                    ctx.drawImage(obj.getImage(obj.currentImage), 0 - obj.options.width * (1 - (obj.moveAnimation.timer / obj.moveAnimation.maxTimer)), 0, obj.options.width, obj.options.height);
                }
                if (obj.isImageLoaded(obj.moveAnimation.previousPhotoId)) {
                    ctx.drawImage(obj.getImage(obj.moveAnimation.previousPhotoId), 0 + obj.options.width * (obj.moveAnimation.timer / obj.moveAnimation.maxTimer), 0, obj.options.width, obj.options.height);
                }
            }
        }

        //DRAWING BUTTONS
        if (obj.galleryButtons.prevButton.loaded) {
            ctx.drawImage(obj.galleryButtons.prevButton.image, 0, (obj.options.height / 2) - (obj.galleryButtons.prevButton.image.height / 2));
        }

        if (obj.galleryButtons.nextButton.loaded) {
            ctx.drawImage(obj.galleryButtons.nextButton.image, obj.options.width - (obj.galleryButtons.nextButton.image.width), (obj.options.height / 2) - (obj.galleryButtons.nextButton.image.height / 2));
        }

        //DRAWING AUTOMATICSLIDESHOW BAR
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(0, obj.options.height - 2, obj.options.width * (obj.automaticSlideshow.timer / obj.options.automaticSlideshowTimer), obj.options.height);
        ctx.stroke();

        window.requestAnimationFrame(() => { obj.drawEvent(obj); });
    };

    photoGalleryInterval() {
        if (this.options.automaticSlideshowTimer > 0 && this.moveAnimation.enabled == false && this.automaticSlideshow.paused == false) {
            this.automaticSlideshow.timer += 10;
            if (this.automaticSlideshow.timer >= this.options.automaticSlideshowTimer) {
                this.nextImage();
            }
        }
        if (this.moveAnimation.enabled == true) {
            this.moveAnimation.timer += 10;
            if (this.moveAnimation.timer >= this.moveAnimation.maxTimer) {
                this.moveAnimation.enabled = false;
            }
        }
    };

}