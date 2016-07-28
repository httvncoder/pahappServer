angular.module('starter.services', [])

.factory('Evictions', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var evictions = [{
      title: '#FamiliaTala',
      day: '2 agost 2016',
      hour:   '9h',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval'
  }, {
      title: '#desnonament 2',
      day: '2 agost 2016',
      hour:   '9h',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval'
  }, {
      title: '#desnonament 3',
      day: '2 agost 2016',
      hour:   '9h',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval'
  }, {
      title: 'desnonament 4',
      day: '2 agost 2016',
      hour:   '9h',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval'
  }, {
      title: '#desnonament 5',
      day: '2 agost 2016',
      hour:   '9h',
      direction:   'c/Aurora',
      description:   'asdf asdf asdf descripció',
      access:   'metro <L2> i <L3> Paral·lel',
      city:   'Barcelona',
      district:   'Raval'
  }];

  return {
    all: function() {
      return evictions;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
