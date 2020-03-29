/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */
let rs = require('readline-sync');
let contacts = [];
function change_alias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    str = str.replace(/ + /g," ");
    str = str.trim(); 
    return str;
}
function Contact(name, phoneNumber) {
  this.name = name;
  this.phoneNumber = phoneNumber;
}
function isExistedPhoneNumber(arr, phone) {
  return arr.map(function(item) {
    return item.phoneNumber;
  }).indexOf(phone);
}
function findContactByKey(arr, key) {
  let i = 0;
  for(let item of arr) {
    if(item.name === key.name && item.phoneNumber === key.phoneNumber) {
      return i;
    } else {
      i++;
    }
  }
}
function addContact(arr) {
  let choose = 'Y';
  do {
    let name = rs.question('Nhập tên: ');
    let phoneNumber = rs.question('Nhập số điện thoại: ');
    if(isExistedPhoneNumber(contacts, phoneNumber) != -1) {
      console.log("Số điện thoại đã tồn tại");
      continue;
    }
    let contact = {
      name: name,
      phoneNumber: phoneNumber
    }
    arr.push(contact);
    choose = rs.question("Bạn có muốn tiếp tục ( Y/N )?: ");
  } while(choose == 'Y' || choose == 'y');
  
}
function editContact(arr) {
  let choose = 'Y';
  do {
    let name = rs.question('Nhập tên muốn sửa: ');
    let phoneNumber = rs.question('Nhập số điện thoại muốn sửa: ');
    let key = {
      name: name,
      phoneNumber: phoneNumber
    }
    let index = findContactByKey(contacts, key);
    if(index > -1) {
      let editName = rs.question('Nhập tên: ');
      let editPhoneNumber;
      do {
        editPhoneNumber = rs.question('Nhập số điện thoại: ');
      } while (isExistedPhoneNumber(contacts, editPhoneNumber) != -1);
      let contact = {
        name: editName,
        phoneNumber: editPhoneNumber
      }
      arr[index] = contact;
    } else {
      console.log("Không tìm thấy thông tin");
    }
    choose = rs.question("Bạn có muốn tiếp tục ( Y/N )?: ");
  } while(choose == 'Y' || choose == 'y');
}
function deleteContact(arr) {
  let choose = 'Y';
  do {
    let name = rs.question('Nhập tên muốn xóa: ');
    let phoneNumber = rs.question('Nhập số điện thoại muốn xóa: ');
    let key = {
      name: name,
      phoneNumber: phoneNumber
    }
    let index = findContactByKey(contacts, key);
    if(index > -1) {
      let choose = rs.question("Bạn chắc chắn không ?(Y/N): ");
      if(choose == 'Y' || choose == 'y') {
        arr.splice(index,1);
      }
    } else {
      console.log("Không tìm thấy thông tin");
    }
    choose = rs.question("Bạn có muốn tiếp tục ( Y/N )?: ");
  } while(choose == 'Y' || choose == 'y');
}
function findContact(arr) {
  let result = [];
  let searchName = rs.question('Nhập tên muốn tìm: ');
  let searchPhoneNumber = rs.question('Nhập số điện thoại muốn tìm: ');
  let key = {
    name: searchName,
    phoneNumber: searchPhoneNumber
  }
  result = arr.filter(function(item) {
    if(item.phoneNumber.includes(key.phoneNumber) || item.name.includes(change_alias(key.name))) {
      return true;
    }
  });
  console.log(result);
}
function display(arr) {
  if(arr.length == 0) {
    console.log("Không có liên hệ");
    return;
  }
  arr.forEach(function(item){
		console.log(item.name + ':', item.phoneNumber);
	});
}
function menu() {
  console.log('1, Xem danh bạ');
  console.log('2, Thêm liên hệ');
  console.log('3, Sửa liên hệ');
  console.log('4, Xóa liên hệ');
  console.log('5, Tìm kiếm');
  console.log('6, Thoát');
  return rs.question('Bạn chọn: ');
}
function main(){
  while(true) {
    let choose = menu();
    switch(choose) {
      case '1':
      {
        display(contacts);
        break;
      }
      case '2':
      {
        addContact(contacts);
        break;
      }
      case '3':
      {
        editContact(contacts);
        break;
      }
      case '4':
      {
        deleteContact(contacts);
        break;
      }
      case '5':
      {
        findContact(contacts);
        break;
      }
      case '6':
      {
        console.log("Tạm biệt");
        return;
      }
      default:
      {
        console.log("Mời nhập lại");
      }
    }
  }
}
main();