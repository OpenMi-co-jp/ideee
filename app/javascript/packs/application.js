// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";
import "channels";

Rails.start();
Turbolinks.start();
ActiveStorage.start();

// JSのファイルを作るときにここで読み込ませる必要有
require("@rails/activestorage").start();
require("trix");
require("@rails/actiontext");
require("jquery");
require("channels/materialize");
require("channels/common");
require("channels/like");
require("channels/copy");
require("channels/form");
require("channels/comment");
require("channels/sort");
require("channels/kaminari");
require("channels/dev-mark");
