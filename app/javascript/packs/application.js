//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require jquery3
//= require jquery_ujs
//= require_tree .

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
require("channels/idea/copy");
require("channels/idea/image_appear");
require("channels/idea/chips");
require("channels/comment");
require("channels/message");
require("channels/sort");
require("channels/kaminari");
require("channels/dev-mark");
require("channels/user_registration_validation");
require("channels/user_edit_validation");
require("channels/user_sessions_validation");
require("channels/carousel");
require("channels/modal");
require("channels/idea/validation");
require("channels/header_scroll");
require("channels/footer_scroll");
require("channels/idea/modal_push");
